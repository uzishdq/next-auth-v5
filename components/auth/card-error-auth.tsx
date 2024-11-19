import React from "react";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";

export default function CardErrorAuth() {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Opps! Something went wrong !" />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" />
      </CardFooter>
    </Card>
  );
}
