import { Message } from "@/components/messaging/message";
import { accounts, messages } from "@/lib/message-data";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function MessagePage() {
  const layout = (await cookies()).get("react-resizable-panels:layout:mail");
  const collapsed = (await cookies()).get("react-resizable-panels:collapsed");

  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Message"
          className="hidden dark:block"
        />
        <Image
          src="/examples/mail-light.png"
          width={1280}
          height={727}
          alt="Message"
          className="block dark:hidden"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <Message
          accounts={accounts}
          messages={messages}
          defaultLayout={defaultLayout}
          defaultCollapsed={defaultCollapsed}
          navCollapsedSize={4}
        />
      </div>
    </>
  );
}
