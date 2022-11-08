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
    <Card>
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
                className="h-48 w-auto object-cover object-top"
                key={i}
              ></img>
            );
          })}
        </div>

        <div className="font-bold text-4xl mx-5">
          Massachusets Institute of Technology
        </div>
        <div className="mx-5 mb-2">Universitas</div>
      </CardHeader>
      <CardBody>
        <table className="table-auto w-full">
          <tbody>
            {attributes.map((el, i) => {
              return (
                <tr key={i}>
                  <td className="w-1/5">
                    <div className="w-auto font-bold">{el[0]}</div>
                  </td>
                  <td>
                    <div>{el[1]}</div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div>
          {accordionsData.map((el, i) => {
            return (
              <Accordion key={i} open={openStates[i]}>
                <AccordionHeader
                  onClick={() => {
                    toggleAccordion(i);
                  }}
                >
                  <div className="text-2xl force-font">{el.header}</div>
                </AccordionHeader>
                <AccordionBody>
                  <div className="text-xl force-font">{el.content}</div>
                </AccordionBody>
              </Accordion>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
