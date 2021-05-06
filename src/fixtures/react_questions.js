const reactQuiz = {
  title: 'Как хорошо ты знаешьт React?',
  questions: [
    {
      question:
        'Какой атрибут обязателен при рендеринге компонентов списка?',
      id: 1,
      correctAnswerId: 1,
      answers: [
        {
          text: 'key',
          id: 1,
        },
        {
          text: 'index',
          id: 2,
        },
        {
          text: 'data-index',
          id: 3,
        },
        {
          text: 'id',
          id: 4,
        },
      ],
    },
    {
      question:
        'Какой метод компонента следует использовать для кастоной логики для реагирования на изменения?',
      id: 2,
      correctAnswerId: 1,
      answers: [
        {
          text: 'shouldComponentUpdate',
          id: 1,
        },
        {
          text: 'getSnapshotBeforeUpdate',
          id: 2,
        },
        {
          text: 'componentWillUpdate',
          id: 3,
        },
        {
          text: 'componentWillMount',
          id: 4,
        },
      ],
    },
    {
      question: 'Что такое React.PureComponent?',
      id: 3,
      correctAnswerId: 3,
      answers: [
        {
          text: 'это базовый класс всех компонентов React',
          id: 1,
        },
        {
          text:
            'React.PureComponent - это компонент, у которого нет метода render.',
          id: 2,
        },
        {
          text:
            'React.PureComponent почти такой же, как React.Component. Основное отличие состоит в том, что первый не реализует метод shouldComponentUpdate ()',
          id: 3,
        },
      ],
    },
    {
      question:
        'Какой метод любого React компонента вызывается первым?',
      id: 4,
      correctAnswerId: 1,
      answers: [
        {
          text: 'constructor',
          id: 1,
        },
        {
          text: 'componentWillMount',
          id: 2,
        },
        {
          text: 'componentDidMount',
          id: 3,
        },
        {
          text: 'render',
          id: 4,
        },
      ],
    },
    {
      question:
        'Какой метод любого React компонента вызывается первым?',
      id: 5,
      correctAnswerId: 2,
      answers: [
        {
          text: 'Обновление props родительского элемента',
          id: 1,
        },
        {
          text:
            'Процесс подъема состояния изменившегося компонента до ближайшего общего предка, чтобы обновить необходимые компоненты.',
          id: 2,
        },
        {
          text: 'Обновление состояния дочерних компонентов',
          id: 3,
        },
      ],
    },
    {
      question:
        'Как создать компонент React без наследования класса React.Component?',
      id: 6,
      correctAnswerId: 1,
      answers: [
        {
          text: 'Используюя метод ReactDOM.render',
          id: 1,
        },
        {
          text:
            'Это невозможно. Все компоненты React должны наследовать React.Component',
          id: 2,
        },
        {
          text: 'Используюя метод React.createElement',
          id: 3,
        },
      ],
    },
  ],
}

export default reactQuiz
