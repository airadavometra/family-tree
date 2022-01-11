import NextHead from "next/head";
import React from "react";

const description = `ДРЕВО – это открытый групповой проект по восстановлению
генеалогических связей и сборе информации о происхождении семьи
Артемовых и родстве с другими семьями.`;

export const PageHead = () => (
  <NextHead>
    <title>Древо</title>
    <meta name="description" content={description} />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1"
      key="viewport"
    />
    <meta property="og:image" content="/share.jpg" />
  </NextHead>
);
