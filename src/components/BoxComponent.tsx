import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import N3 from 'n3';
import { useEffect, useState } from 'react';
import ParsingClient from 'sparql-http-client/ParsingClient';

import { AppConfig } from '@/utils/AppConfig';
import {
  getIRILabelFromStore,
  getLabelFromStore,
  getVocab,
  ignoredPredicate,
} from '@/utils/sparql';

const initialInfoBox = {
  title: '',
  desc: '',
  image: [],
  attributes: [],
};

const COLLECTION_API = `${AppConfig.base_backend}/collection`;
export default function BoxComponent({ boxID, type }) {
  const [infoBox, setInfoBox] = useState(initialInfoBox);
  const addInfoBox = (key, value) => {
    setInfoBox((oldValue) => {
      return {
        ...oldValue,
        [key]: value,
      };
    });
  };
  const addImage = (imageSrc, imageAlt) => {
    setInfoBox((oldValue) => {
      return {
        ...oldValue,
        image: [
          ...oldValue.image,
          {
            src: imageSrc,
            alt: imageAlt,
          },
        ],
      };
    });
  };
  const addAttributes = (
    attrKeyURL,
    attrKeyLabel,
    attrValueURL,
    attrValueLabel
  ) => {
    setInfoBox((oldValue) => {
      const newAttributes = [
        ...oldValue.attributes,
        [
          {
            url: attrKeyURL,
            label: attrKeyLabel,
          },
          { url: attrValueURL, label: attrValueLabel },
        ],
      ];
      newAttributes.sort((a, b) => {
        if (a[0].label === b[0].label) return a[1].url > b[1].url ? -1 : 1;
        return a[0].label < b[0].label ? -1 : 1;
      });
      return { ...oldValue, attributes: newAttributes };
    });
  };

  const fillImage = () => {
    const fetcher = new ParsingClient({
      endpointUrl: AppConfig.sparql_wikidata,
    });
    const store = new N3.Store();
    fetcher.query
      .select(
        `SELECT ?label ?thumb WHERE {
          VALUES ?ident{wd:${boxID}}.
          ?ident rdfs:label ?label .		
          ?ident wdt:P18 ?image .
       
          BIND(REPLACE(wikibase:decodeUri(STR(?image)), "http://commons.wikimedia.org/wiki/Special:FilePath/", "") as ?fileName) .
          BIND(REPLACE(?fileName, " ", "_") as ?safeFileName)
          BIND(MD5(?safeFileName) as ?fileNameMD5) .
          BIND(CONCAT("https://upload.wikimedia.org/wikipedia/commons/thumb/", SUBSTR(?fileNameMD5, 1, 1), "/", SUBSTR(?fileNameMD5, 1, 2), "/", ?safeFileName, "/200px-", ?safeFileName) as ?thumb)
            FILTER (lang(?label)="en")    
        }`
      )
      .then((images) => {
        store.addQuads(images);
        for (const image of images) {
          addImage(image.thumb.value, image.label.value);
        }
      });
  };

  useEffect(() => {
    setInfoBox(initialInfoBox);
    const fetcher = new ParsingClient({
      endpointUrl: AppConfig.sparql_backend,
    });

    const store = new N3.Store();
    fetcher.query
      .construct(
        `
      prefix : <http://qs.hocky.id/v/>
      prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#>
      prefix owl: <http://www.w3.org/2002/07/owl#>
      prefix p: <https://qs.hocky.id/p/>
      prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
      prefix vcard: <http://www.w3.org/2006/vcard/ns#>
      prefix xsd: <http://www.w3.org/2001/XMLSchema#>
      
      CONSTRUCT {
        ?id ?prop ?val .
        ?val rdfs:label ?valLabel .
      } WHERE {
        VALUES ?id { :${boxID} } .
        ?id ?prop ?val .
        OPTIONAL {
          ?val rdfs:label ?valLabel .
        }
      }`
      )
      .then((val) => {
        setInfoBox(initialInfoBox);
        store.addQuads(val);
        addInfoBox('title', getLabelFromStore(store, getVocab(boxID)));
        addAttributes('', 'type', '', type);
        const availableProps = store.getQuads(getVocab(boxID));
        for (const prop of availableProps) {
          if (!(prop.predicate.value in ignoredPredicate)) {
            const url = prop.object.datatype ? '' : prop.object.value;
            addAttributes(
              prop.predicate.value,
              getIRILabelFromStore(store, prop.predicate.value),
              url,
              getIRILabelFromStore(store, prop.object.value, false)
            );
          }
        }
        fillImage();
      });
  }, [boxID]);
  return boxID !== '' ? (
    <Card className="w-auto z-[0] static py-5 px-3">
      <CardHeader
        className="m-0"
        floated={false}
        variant="gradient"
        color="white"
      >
        <div className="flex basis-2 overflow-x-scroll gap-2">
          {infoBox.image.map((el, i) => {
            return (
              <img
                src={el.src}
                alt={el.alt}
                className="h-28 w-auto object-cover object-top"
                key={i}
              ></img>
            );
          })}
        </div>
        <div className="mx-3 flex gap-1 flex-col mb-2 mt-3">
          <div className="font-bold text-lg md:text-xl leading-none">
            {infoBox.title}
          </div>
          <div className="text-sm">{type}</div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="font-bold text-amber-600">📚 Top Result</div>
        <div className="text-xs">
          <table className="table-fixed whitespace-pre-line break-all">
            <tbody>
              {infoBox.attributes.map((el, i) => {
                return (
                  <tr key={i}>
                    <td className="border border-y-{1} border-x-0 w-1/2 lg:w-40">
                      <a href={el[0].url} className="w-auto font-bold ">
                        {el[0].label}
                      </a>
                    </td>
                    <td className="border border-y-{1}  border-x-0">
                      {el[1].url ? (
                        <a href={el[1].url}>{el[1].label}</a>
                      ) : (
                        <div>{el[1].label}</div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardBody>
    </Card>
  ) : (
    <div />
  );
}
