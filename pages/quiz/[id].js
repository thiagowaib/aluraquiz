import React from 'react';
import { ThemeProvider } from 'styled-components';
import QuizScreen from '../../src/screens/Quiz';

export default function QuizDaGaleraPage(props) {
  return (
    <ThemeProvider theme={props.dbExterno.theme}>
      <QuizScreen externalQuestions={props.dbExterno.questions} />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split('___');

  const dbExterno = await fetch(
    `https://${projectName}.${githubUser}.vercel.app/api/db`,
  )
    .then((respostaDoServer) => {
      return respostaDoServer.json();
    })
    .catch((err) => {
      console.error(err);
    });

  return {
    props: {
      dbExterno,
    }, //will be passed to the page component as props (na func. de cima ali ó)
  };
}
