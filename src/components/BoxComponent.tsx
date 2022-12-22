import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import N3 from 'n3';
import { useEffect, useState } from 'react';
import { SocialIcon } from 'react-social-icons';
import ParsingClient from 'sparql-http-client/ParsingClient';

import { AppConfig } from '@/utils/AppConfig';
import {
  getIRIEnding,
  getIRILabelFromStore,
  getLabelFromStore,
  getPropFromStore,
  getQS,
  getVocab,
  getWikidataIfExist,
  ignoredPredicate,
  isInferredFromSameAs,
  sparqlTerms,
} from '@/utils/sparql';

const initialInfoBox = {
  title: '',
  desc: '',
  type: '',
  image: [],
  attributes: [],
};

const COLLECTION_API = `${AppConfig.base_backend}/collection`;
export default function BoxComponent(props) {
  const { isVocab, boxID, type, fromSearch } = props;
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

  const fillImage = (quads) => {
    const fetcher = new ParsingClient({
      endpointUrl: AppConfig.sparql_dbpedia,
    });
    const store = new N3.Store();
    fetcher.query
      .select(
        `prefix wd: <http://www.wikidata.org/entity/>
          PREFIX wikibase: <http://wikiba.se/ontology#>
          
          SELECT ?label ?thumb WHERE {
            VALUES ?wd{ <${getWikidataIfExist(quads, getVocab(boxID))}> } .
            ?ident owl:sameAs ?wd .
            ?ident rdfs:label ?label .
            ?ident foaf:depiction ?image .
            BIND(
              REPLACE((STR(?image)), "http://commons.wikimedia.org/wiki/Special:FilePath/", "")
              as ?fileName
            ) .
            BIND(REPLACE(?fileName, " ", "_") as ?safeFileName)
            BIND(MD5(?safeFileName) as ?fileNameMD5) .
            BIND(
              CONCAT("https://upload.wikimedia.org/wikipedia/commons/thumb/",
                      SUBSTR(?fileNameMD5, 1, 1),
                      "/",
                      SUBSTR(?fileNameMD5, 1, 2),
                      "/",
                      ?safeFileName, "/200px-", ?safeFileName)
              as ?thumb
            )
            FILTER (lang(?label)="en")
          }`
      )
      .then((images) => {
        store.addQuads(images);
        for (const image of images) {
          addImage(image.thumb.value, image.label.value);
        }
      });
    const fetcher2 = new ParsingClient({
      endpointUrl: AppConfig.sparql_wikidata,
    });
    fetcher2.query
      .select(
        `SELECT ?label ?thumb WHERE {
          VALUES ?ident{<${getWikidataIfExist(quads, getVocab(boxID))}>}.
          ?ident rdfs:label ?label .
          ?ident wdt:P18 ?image .
        
          BIND(
            REPLACE(wikibase:decodeUri(STR(?image)),
              "http://commons.wikimedia.org/wiki/Special:FilePath/", "")
            as ?fileName
          ) .
          BIND(REPLACE(?fileName, " ", "_") as ?safeFileName)
          BIND(MD5(?safeFileName) as ?fileNameMD5) .
          BIND(
            CONCAT("https://upload.wikimedia.org/wikipedia/commons/thumb/",
                    SUBSTR(?fileNameMD5, 1, 1), "/",
                    SUBSTR(?fileNameMD5, 1, 2), "/", ?safeFileName, "/200px-", ?safeFileName)
            as ?thumb
          )
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

  const fillSocialMedia = (quads) => {
    const fetcher = new ParsingClient({
      endpointUrl: AppConfig.sparql_wikidata,
    });
    const store = new N3.Store();
    fetcher.query
      .select(
        `
         SELECT ?ident ?instagram ?facebook ?gmaps ?twitter WHERE {
            VALUES ?ident{<${getWikidataIfExist(quads, getVocab(boxID))}>}
            OPTIONAL {
              ?ident wdt:P2003 ?instagram .
            }
            OPTIONAL {
              ?ident wdt:P2013 ?facebook .
            }
            OPTIONAL {
              ?ident wdt:P3749 ?gmaps .
            }
            OPTIONAL {
              ?ident wdt:P2002 ?twitter .
            }
          } 
        `
      )
      .then((socialMedia) => {
        if (socialMedia[0].twitter)
          addInfoBox('twitter', socialMedia[0].twitter.value);
        if (socialMedia[0].facebook)
          addInfoBox('facebook', socialMedia[0].facebook.value);
        if (socialMedia[0].instagram)
          addInfoBox('instagram', socialMedia[0].instagram.value);
        if (socialMedia[0].gmaps)
          addInfoBox('gmaps', socialMedia[0].gmaps.value);
      });
  };

  useEffect(() => {
    if (!boxID) return;
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
        VALUES ?id { ${isVocab ? '' : 'p'}:${boxID} } .
        ?id ?prop ?val .
        OPTIONAL {
          ?val rdfs:label ?valLabel .
        }
      }`
      )
      .then((val) => {
        setInfoBox(initialInfoBox);
        store.addQuads(val);
        addInfoBox(
          'type',
          getIRIEnding(
            getPropFromStore(
              store,
              getQS(boxID, isVocab),
              `${sparqlTerms.rdfLabel}type`
            )
          )
        );
        addInfoBox('title', getLabelFromStore(store, getQS(boxID, isVocab)));
        // addAttributes('', 'type', '', type);
        const availableProps = store.getQuads(getQS(boxID, isVocab));
        for (const prop of availableProps) {
          if (
            !(prop.predicate.value in ignoredPredicate) &&
            !isInferredFromSameAs(prop)
          ) {
            const url = prop.object.datatype ? '' : prop.object.value;
            addAttributes(
              prop.predicate.value,
              getIRILabelFromStore(store, prop.predicate.value),
              url,
              getIRILabelFromStore(store, prop.object.value, false)
            );
          }
        }
        fillImage(store);
        fillSocialMedia(store);
      });
  }, [boxID]);
  return boxID !== '' ? (
    <Card
      className={`w-[80vw] ${
        fromSearch ? 'md:w-[30vw]' : 'md:w-full'
      } z-[0] static py-5 px-3`}
    >
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
                onError={(event) => {
                  // @ts-ignore
                  // eslint-disable-next-line no-param-reassign
                  event.target.style.display = 'none';
                }}
              ></img>
            );
          })}
        </div>
        <div className="mx-3 flex gap-1 flex-col mb-2 mt-3">
          <div className="font-bold text-lg md:text-xl leading-none">
            {infoBox.title}
          </div>
          <div className="text-sm">
            {infoBox.type === '' ? type : infoBox.type}
          </div>
          <div className={'flex flex-row gap-2'}>
            {
              // @ts-ignore
              infoBox.twitter && (
                <SocialIcon
                  style={{ height: 25, width: 25 }}
                  url={
                    // @ts-ignore
                    `https://twitter.com/${infoBox.twitter}`
                  }
                />
              )
            }
            {
              // @ts-ignore
              infoBox.facebook && (
                <SocialIcon
                  style={{ height: 25, width: 25 }}
                  url={
                    // @ts-ignore
                    `https://facebook.com/${infoBox.facebook}`
                  }
                />
              )
            }
            {
              // @ts-ignore
              infoBox.gmaps && (
                <SocialIcon
                  style={{ height: 25, width: 25 }}
                  url={
                    // @ts-ignore
                    `https://www.google.com/maps?cid=${infoBox.gmaps}`
                  }
                />
              )
            }
            {
              // @ts-ignore
              infoBox.instagram && (
                <SocialIcon
                  style={{ height: 25, width: 25 }}
                  url={
                    // @ts-ignore
                    `https://www.instagram.com/${infoBox.instagram}`
                  }
                />
              )
            }
          </div>
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
