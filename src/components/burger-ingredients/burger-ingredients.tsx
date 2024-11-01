import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredients, getIngredientsSelector } from '@slices';
import { Preloader } from '../ui/preloader';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const { data, loading, error } = useSelector(getIngredientsSelector);
  const dispatch = useDispatch();
  const buns: TIngredient[] = data.filter((item) => item.type === 'bun');
  const mains: TIngredient[] = data.filter((item) => item.type === 'main');
  const sauces: TIngredient[] = data.filter((item) => item.type === 'sauce');

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
    // dispatch(getIngredients());
  }, [inViewBuns, inViewFilling, inViewSauces]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return <Preloader />;
  }

  if (!loading && error) {
    return <p>Не удалось получить список ингредиентов. Ошибка: {error}</p>;
  }

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
