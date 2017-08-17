const Template = (title, filename) => Object.assign({}, { title, filename });

const templates = [
  Template('Blank', 'blank.html'),
  Template('CEO update', 'ceo-update.html'),
  Template('CFO/COO update', 'cfo-coo-update.html'),
  Template('CCO update', 'cco-update.html'),
  Template('Jack insider', 'jack-insider.html'),
  Template('Jack news', 'jack-news.html'),
  Template('Jack Awards 2017', 'jack-awards-2017.html'),
  Template('Jack Awards 2018', 'jack-awards-2018.html'),
];

const Iframe = () => {
  const node = document.querySelector('iframe');
  
  return Object.assign(
    {},
    {
      render: filename => {
        node.setAttribute('name', Date.now());
        node.setAttribute('src', `dist/templates/${filename}?time=${Date.now()}`);
      },
    },
  );
};

const NavItem = ({ title, index, selected = false, handleClick}) => {
  const node = document.createElement('button');
  
  return Object.assign(
    {},
    {
      render: () => {
        node.setAttribute('data-index', index);
        node.innerHTML = title;
        node.addEventListener('click', () => handleClick(index));
        
        if (selected) {
          node.setAttribute('class', 'selected');
        } 
        
        return node;
      },
    },
  );
};

const Nav = ({ handleClick }) => {
  const node = document.querySelector('nav');
  
  let navItems = [];
  
  return Object.assign(
    {},
    {
      render: ({ currentIndex }) => {
        node.innerHTML = '';
        
        navItems = templates.map((template, index) => {
          const { title } = template;
          const selected = index === currentIndex;
          const templateNode = NavItem({ title, index, selected, handleClick });
          return templateNode.render();
        });
        
        navItems.forEach(navItem => node.appendChild(navItem));
        
        return node;
      },
    },
  );
};

const App = () => {  
  let state = {
    currentIndex: 0,
  };
    
  const render = () => {
    const { currentIndex } = state;
    const currentTemplate = templates[currentIndex];
    const { filename } = currentTemplate;
    
    nav.render({ currentIndex });
    iframe.render(filename);
  }
  
  const getCurrentIndex = () => state.currentIndex;

  const setCurrentIndex = (currentIndex) => {
    const newState = { ...state, currentIndex };
    state = newState;
    render();
  };
  
  const nav = Nav({ handleClick: setCurrentIndex });
  const iframe = Iframe();
  
  return Object.assign(
    {},
    { 
      getCurrentIndex,
      setCurrentIndex,
      render,
    }
  );
};

const app = App();
app.render();

