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
import { useState } from 'react';

export default function BoxComponent({ images, attributes, accordionsData }) {
  const [openStates, setOpenStates] = useState<boolean[]>(
    // Array(accordionsData.length).fill(false)
    Array(accordionsData.length).fill(false)
  );
  const toggleAccordion = (index) => {
    setOpenStates((curState) => {
      const tmp = [...curState];
      tmp[index] = !tmp[index];
      return tmp;
    });
  };
  return (
    <Card className="p-3 m-3">
      <CardHeader
        className="m-0"
        floated={false}
        variant="gradient"
        color="white"
      >
        <div className="flex-fit flex basis-2 overflow-x-scroll gap-2">
          {images.map((el, i) => {
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
          <div className="font-bold text-3xl leading-none">
            Massachusets Institute of Technology
          </div>
          <div>Universitas</div>
        </div>
      </CardHeader>

      <CardBody>
        <div className="font-bold text-3xl text-blue-400">📚 Basic Info</div>
        <div>
          {attributes.map((el, i) => {
            return (
              <div className="flex flex-row gap-3" key={i}>
                <div className="w-auto font-bold">{el[0]}</div>
                <div>{el[1]}</div>
                <hr />
              </div>
            );
          })}
        </div>
        <hr className="my-3" />
        <div>
          <div className="font-bold text-3xl text-blue-400">
            📚 Extra Info
          </div>
          {accordionsData.map((el, i) => {
            return (
              <Accordion key={i} open={openStates[i]}>
                <AccordionHeader
                  className="py-1"
                  onClick={() => {
                    toggleAccordion(i);
                  }}
                >
                  <div className="force-font text-2xl">{el.header}</div>
                </AccordionHeader>
                <AccordionBody className="py-2">
                  <div className="force-font text-xl">{el.content}</div>
                </AccordionBody>
              </Accordion>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
