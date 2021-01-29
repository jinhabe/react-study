import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from 'App';
import 'common.css';
import * as serviceWoker from 'serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'modules';
import { CookiesProvider }  from 'react-cookie';
{/* javascript import에서 {}가 있는 것은 해당 라이브러리에서 export 한 것. import에 {}가 없는 것은 export defualt 한 것 / 참고 URL https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules */}

const store = createStore(rootReducer, composeWithDevTools());

// id = root 요소에 첫번쨰 파라미터 내용 렌더링하는 곳.
ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWoker.unregister();
