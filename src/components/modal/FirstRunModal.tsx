import React from 'react';
import BaseMainButton from '../buttons/BaseMainButton';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface FirstRunModalProps {
  showed: boolean;
  onCloseModal: () => void;
}

const FirstRunModal: React.FC<FirstRunModalProps> = ({ showed, onCloseModal }) => {
  const [, setFirstRun] = useLocalStorage('first_run', true);

  const handleClose = () => {
    setFirstRun(false);
    onCloseModal();
  };

  if (!showed) return null;

  return (
    <>
      <div className="modal-title">Внимание</div>
      <div className="modal-content">
        <p>
          Добро пожаловать! Вы используете <strong>неофициальный клиент</strong> Anixart — альтернативное приложение, созданное для более удобного просмотра контента с Anixart на ПК. Мы не связаны с оригинальными разработчиками Anixart. Сейчас приложение находится в стадии <strong>бета-тестирования</strong>. Так что могут быть баги.
        </p>
        <p>
          Для улучшения приложения и понимания его работы мы собираем <strong>анонимную статистику использования</strong>. Это помогает нам выявлять проблемы, анализировать популярные функции и делать приложение лучше.
        </p>
        <p>
          <strong>Никакая личная информация не сохраняется.</strong> Вы всегда можете <strong>отключить аналитику</strong> в настройках в любой момент.
        </p>
        <p>
          Спасибо, что используете наш клиент ❤️
        </p>
        <BaseMainButton style="primary" onClickCallback={handleClose}>
          Понятно
        </BaseMainButton>
      </div>
    </>
  );
};

export default FirstRunModal;