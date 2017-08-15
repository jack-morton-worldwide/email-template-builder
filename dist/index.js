const Template = (title, filename) => Object.assign({}, { title, filename });

const templates = [
  Template('CEO update', 'ceo-update.html'),
  Template('CCO update', 'cco-update.html'),
];

const NavItem = ({ title, filename }) => {
  const node = document.createElement('button');
  
  return Object.assign(
    {},
    {
      render: () => {
        node.setAttribute('data-filename', filename);
        node.innerHTML = title;
        return node;
      },
    },
  );
};

const Nav = () => {
  const node = document.querySelector('nav');
  
  let navItems = [];
  
  return Object.assign(
    {},
    {
      render: () => {
        node.innerHTML = '';
        
        navItems = templates.map((template) => {
          const templateNode = NavItem(template);
          return templateNode.render();
        });
        
        navItems.forEach(navItem => node.appendChild(navItem));
        
        return node;
      },
    },
  );
};

const App = () => {
  const nav = Nav();
  
  let state = {
    currentTemplate: null,
  };
  
  return Object.assign(
    {},
    { 
      getCurrentTemplate: () => state.currentTemplate,
      setCurrentTemplate: (currentTemplate) => {
        const newState = { ...state, currentTemplate };
        state = newState;
      },
      render: () => {
        nav.render();
      },
    }
  );
};

const app = App();
app.render();

