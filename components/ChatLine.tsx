import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            Walter
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ role = "assistant", content }: ChatGPTMessage) {

  const [showTooltip, setShowTooltip] = useState(true);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timeoutId);
  }, []);

  if (!content) {
    return null;
  }

  const formatteMessage = role == "assistant" ? JSON.parse(content) : convertNewLines(content);


  return (
    <div
      className={
        role != "assistant" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white px-4 py-5 shadow-lg ring-1 ring-zinc-100 sm:px-6">
          <div className="flex space-x-3">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900">
             
                <a href="#" className="hover:underline">
                  {role == "assistant"
                    ? `Walter ${formatteMessage.emotion}`
                    : "You"}
                </a>
                {role == "assistant" && showTooltip && (
                  <span className="max-w-xs bg-gray-100 text-gray-800 text-sm rounded-lg shadow-lg absolute py-1 px-2 left-5/4  transform  -translate-y-2/3 opacity-100 visible transition-opacity duration-300">
                    {convertNewLines(formatteMessage.thoughts)}
                  </span>
                )}
              </p>
             
              <p
                className={clsx(
                  "text ",
                  role == "assistant" ? "font-semibold font- " : "text-gray-400"
                )}
              >
                {role == "assistant"
                  ? convertNewLines(formatteMessage.message) 
                  : formatteMessage}
              </p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
