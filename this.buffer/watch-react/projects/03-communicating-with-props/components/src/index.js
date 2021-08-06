import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import ApprovalCard from "./ApprovalCard";
import CommentDetail from "./CommentDetail";
import Message from "./Message";
import Segment from "./Segment";

const App = () =>
{
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <div>
          <h4>Warning!</h4>
          Are you sure you want to do this?
        </div>
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Sam Perell"
          timeAgo="Today at 4:45PM"
          content="Nice blog post!"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Alex Preston"
          timeAgo="Today at 2:00AM"
          content="I agree with all of this."
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Lenny Dane"
          timeAgo="Yesterday at 5:00PM"
          content="Can we have a part 2?"
          avatar={faker.image.avatar()}
        />
      </ApprovalCard>
      <Message
        header="Changes in Service"
        text="We just updated our privacy policy here to better service our customers."
      />
      <Segment>
        <div>
          <div className="ui icon header">
            <i className="pdf file outline icon"></i>
            No documents are listed for this customer.
          </div>
          <div className="ui primary button">Add Document</div>
        </div>
      </Segment>
      <Segment>
        <div>
          <h4 className="ui header">For Your Information</h4>
          <p>
            Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
          </p>
        </div>
      </Segment>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));