import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import {
  Form,
  routeAction$,
  routeLoader$,
  server$,
} from '@builder.io/qwik-city';

import styles from './index.css?inline';

export const useDadJoke = routeLoader$(async () => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' },
  });
  return (await response.json()) as {
    id: string,
    status: number,
    joke: string,
  };
});

export const useJokeVoteAction = routeAction$(props => {
  console.log('VOTE', props);
});

export default component$(() => {
  useStylesScoped$(styles);

  const isFavoriteSignal = useSignal(false);
  useTask$(({ track }) => {
    track(() => isFavoriteSignal.value);
    console.log('FAVORITE (isomorphic)', isFavoriteSignal.value);
    server$(() => {
      console.log('FAVORITE (server)', isFavoriteSignal.value);
    })();
  });

  const dadJokeSignal = useDadJoke();
  const favoriteJokeAction = useJokeVoteAction();

  return (
    <div class="container">
      <section class="section bright">
        <p>{dadJokeSignal.value.joke}</p>
        <Form action={favoriteJokeAction}>
          <input type="hidden" name="jokeID" value={dadJokeSignal.value.id} />
          <button name="vote" value="up">👍</button>
          <button name="vote" value="down">👎</button>
        </Form>
        <button
          onClick$={() => isFavoriteSignal.value = !isFavoriteSignal.value}
        >
          {isFavoriteSignal.value ? '❤️' : '🤍'}
        </button>
      </section>
      <section>
        <a href={import.meta.env.BASE_URL}>Home</a>
      </section>
    </div>
  );
});
