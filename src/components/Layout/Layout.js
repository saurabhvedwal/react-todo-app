import React from 'react';
import SideBanner from '../SideBanner/SideBanner';
import TodoPanel from '../TodoPanel/TodoPanel';

const layout = (props) => {

    return (
        <main className="App row">
            <SideBanner classes="App-header col-md-4" />
            <TodoPanel classes="col-md-8" />
        </main>
    );

};

export default layout;