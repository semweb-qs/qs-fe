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
      <CardHeader floated={false} variant="gradient" color="white">
        <div className="grid grid-flow-row-dense grid-cols-2 grid-rows-2">
          {images.map((el, i) => {
            return (
              <img
                src={el.src}
                alt={el.alt}
                className="h-48 w-full object-cover object-top"
                key={i}
              ></img>
            );
          })}
        </div>
      </CardHeader>
      <CardBody>
        <div>asu</div>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography>Don't have an account?</Typography>
      </CardFooter>
    </Card>
  );
}
