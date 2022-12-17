import { Card, CardBody, CardHeader } from '@material-tailwind/react';
import N3 from 'n3';
import { useEffect, useState } from 'react';
import ParsingClient from 'sparql-http-client/ParsingClient';

import { AppConfig } from '@/utils/AppConfig';
import {
  getLabelFromStore,
  getProp,
  getPropFromStore,
  getPropLabelFromStore,
  getVocab,
} from '@/utils/sparql';

const initialInfoBox = {
  title: '',
  desc: '',
  image: [],
  attributes: [],
};
const COLLECTION_API = `${AppConfig.base_backend}/collection`;
export default function BoxComponent({ id, type }) {
  const [infoBox, setInfoBox] = useState(initialInfoBox);
  const [init, setInit] = useState(false);
  const addInfoBox = (key, value) => {
    setInfoBox((oldValue) => {
      const ret = {
        ...oldValue,
        [key]: value,
      };
      return ret;
    });
  };
  const addImage = (imageSrc, imageAlt) => {
    setInfoBox((oldValue) => {
      const ret = {
        ...oldValue,
        image: [
          ...oldValue.image,
          {
            src: imageSrc,
            alt: imageAlt,
          },
        ],
      };
      console.log(ret);
      return ret;
    });
  };
  const addAttributes = (attrKey, attrValue) => {
    setInfoBox((oldValue) => {
      return {
        ...oldValue,
        attributes: [...oldValue.attributes, [attrKey, attrValue]],
      };
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
        VALUES ?id { :${id} } .
        ?id ?prop ?val .
        OPTIONAL {
          ?val rdfs:label ?valLabel .
        }
      }`
      )
      .then((val) => {
        setInfoBox(initialInfoBox);
        store.addQuads(val);
        addInfoBox('title', getLabelFromStore(store, getVocab(id)));
        addImage(
          getPropFromStore(store, getVocab(id), getProp('hasLogo')),
          'logo'
        );
        addAttributes('type', type);
        const availableProps = store.getQuads(getVocab(id));
        for (const prop of availableProps) {
          addAttributes(
            getPropLabelFromStore(store, prop.predicate.value),
            prop.object.value
          );
        }
      });
  }, []);
  return (
    <Card className="lg:w-[40vw] z-[0] static h-fit p-3 m-3">
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
          <div className="font-bold text-3xl leading-none">{infoBox.title}</div>
          <div>{type}</div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="font-bold text-xl text-amber-600">📚 Top Result</div>
        <div>
          {infoBox.attributes.map((el, i) => {
            return (
              <div className="flex flex-row gap-3" key={i}>
                <div className="w-auto font-bold">{el[0]}</div>
                <div>{el[1]}</div>
                <hr />
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
