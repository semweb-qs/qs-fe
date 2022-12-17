import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import parse from 'html-react-parser';
import N3 from 'n3';
import { useEffect, useState } from 'react';
import ParsingClient from 'sparql-http-client/ParsingClient';

import { AppConfig } from '@/utils/AppConfig';
import { highlight } from '@/utils/highlight';
import { getLabel, getVocab } from '@/utils/sparql';

const COLLECTION_API = `${AppConfig.base_backend}/collection`;
export default function BoxComponent({ id, type }) {
  const fetcher = new ParsingClient({
    endpointUrl: 'https://api-qs.hocky.id/bigdata/sparql',
  });

  const [infoBox, setInfoBox] = useState({ title: '', desc: '' });
  const addInfoBox = (key, value) => {
    setInfoBox((oldValue) => {
      return {
        ...oldValue,
        key: value,
      };
    });
  };
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
      store.addQuads(val);
      console.log(store);
      const tmp = store.getQuads(getVocab(id));
      addInfoBox('title', getLabel(store, getVocab(id)));
      // store.match('')
      // store.add(val);
    });
  return (
    <Card className="lg:w-[40vw] z-[0] static h-fit p-3 m-3">
      <CardBody>
        <div className="font-bold text-xl text-amber-600">📚 Top Result</div>
        <div className={'font-extrabold'}>{infoBox.title}</div>
        <div className={'text-xs'}>{parse(infoBox.desc)}</div>
        <hr className="my-3" />
      </CardBody>
    </Card>
  );
}
