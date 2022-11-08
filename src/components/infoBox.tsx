import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

export default function BoxComponent() {
  return (
    <Card>
      <CardHeader floated={false} variant="gradient" color="blue">
        <img src="https://www.material-tailwind.com/_next/image?url=%2Fimg%2Fteam-3.jpg&w=3840&q=100" alt="profile-picture" />
      </CardHeader>
      <CardBody>
        <div>asu</div>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography>
          Don't have an account?
        </Typography>
      </CardFooter>
    </Card>
  );
}
