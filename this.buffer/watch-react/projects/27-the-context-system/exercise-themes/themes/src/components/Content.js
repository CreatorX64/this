import React from "react";
import { Segment } from "./Segment";
import { Placeholder } from "./Placeholder";
import { Heading } from "./Heading";
import { Divider } from "./Divider";
import { Button } from "./Button";

export class Content extends React.Component {
  render() {
    return (
      <Segment>
        <Heading>Summary</Heading>
        <Placeholder />
        <Divider />
        <Button>Click Me</Button>
      </Segment>
    );
  }
}
