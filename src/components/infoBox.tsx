import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from '@material-tailwind/react';

export default function BoxComponent() {
  return (
    <Card className="border-gray w-full rounded-xl border-solid border h-full">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="blue">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div>asu</div>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="small" className="mt-6 flex justify-center">
          Don't have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
