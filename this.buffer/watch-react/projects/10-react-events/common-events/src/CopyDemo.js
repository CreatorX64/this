import { Component } from "react";

export class CopyDemo extends Component {
  handleCopy() {
    alert("STOP STEALING FROM ME!");
  }

  render() {
    return (
      <div>
        <h2>Try copying some of this text:</h2>
        <section
          style={{ width: "300px", display: "inline-block" }}
          onCopy={this.handleCopy}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, quod
          in nulla tempore nam autem commodi consequatur beatae exercitationem
          non deserunt tenetur perspiciatis, eligendi, unde placeat. Corporis
          aliquid voluptatem velit iure vitae iusto exercitationem quisquam
          veritatis magni excepturi! Eum nobis quam amet expedita repellendus!
          Omnis voluptatem quos, ipsam maxime tempora pariatur a dolor
          blanditiis tenetur iusto eligendi nesciunt ut totam!
        </section>
      </div>
    );
  }
}
