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
import { useEffect, useState } from 'react';

import { AppConfig } from '@/utils/AppConfig';
import { highlight } from '@/utils/highlight';

const COLLECTION_API = `${AppConfig.base_backend}/collection`;
export default function BoxComponent({ name, url, query }) {
  const splitted = url.split('/');
  const part = splitted[splitted.length - 2];
  const cid = splitted[splitted.length - 1];
  const [desc, setDesc] = useState('');
  return (
    <Card className="lg:w-[40vw] z-[0] static h-fit p-3 m-3">
      <CardBody>
        <div className="font-bold text-xl text-amber-600">📚 Top Result</div>
        <div className={'font-extrabold'}>{name}</div>
        <div className={'text-xs'}>{parse(desc)}</div>
        <hr className="my-3" />
      </CardBody>
    </Card>
  );
}
