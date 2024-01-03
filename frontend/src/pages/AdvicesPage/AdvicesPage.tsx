import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as advicesActions from '../../features/advicesSlice';
import { Loader } from '../../components/Loader';
import { NewAdvice } from '../../types/Advice';

export const AdvicesPage = () => {
  const [newAdvice, setNewAdvice] = useState<NewAdvice>({
    question: '',
    answer: '',
  });
  const dispatch = useAppDispatch();
  const { advices, isLoadingAdvices } = useAppSelector(state => state.advices);

  useEffect(() => {
    dispatch(advicesActions.init());
  }, [dispatch]);

  const handleRemove = (id: number) => {
    dispatch(advicesActions.remove(id));
  };

  const handleAdd = async () => {
    await dispatch(advicesActions.add(newAdvice));

    setNewAdvice({ question: '', answer: '' });
  };

  return (
    <div className="faq-page">
      <h2>FAQ</h2>
      <br />
      {!!advices.length &&
        advices.map(advice => (
          <div key={advice.id}>
            <h3>{advice.question}</h3>
            <p>{advice.answer}</p>
            <button onClick={() => handleRemove(advice.id)}>Remove</button>
            <br />
            <br />
          </div>
        ))}

      {isLoadingAdvices && <Loader />}

      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Question"
          value={newAdvice.question}
          onChange={event =>
            setNewAdvice(state => ({
              ...state,
              question: event.target.value,
            }))
          }
        />
        <input
          type="text"
          placeholder="Answer"
          value={newAdvice.answer}
          onChange={event =>
            setNewAdvice(state => ({
              ...state,
              answer: event.target.value,
            }))
          }
        />
        <button>Add</button>
      </form>
    </div>
  );
};
