import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

const images = [
  {
    src: 'https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg',
  },
  {
    src: 'https://static.wikia.nocookie.net/gensin-impact/images/e/e1/Character_Venti_Game.png',
  },
  {
    src: 'https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg',
    alt: 'Boats (Jeshu John - designerspics.com)',
  },
  {
    src: 'https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg',
  },
];
export default function BoxComponent() {
  return (
    <Card>
      <CardHeader className="m-0" floated={false} variant="gradient" color="white">
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
            <tr>
              <td className="w-1/5">
                <div className="w-auto font-bold">Nama</div>
              </td>
              <td>
                <div>Telur</div>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
