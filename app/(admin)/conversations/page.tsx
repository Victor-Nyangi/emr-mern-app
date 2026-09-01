import { Message } from "@/components/messaging/message";
import { accounts, messages as dummyMessages } from "@/lib/message-data";

export default function Page() {
  return (
    <section>
      <Message
        accounts={accounts}
        messages={dummyMessages}
        defaultLayout={[20, 32, 48]}
        navCollapsedSize={10}
      />
    </section>
  );
}
