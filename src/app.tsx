import 'jquery';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from 'mtg-shuffle/components/Application';

const wrapper = document.getElementById('app-wrapper');
if (wrapper) {
    ReactDOM.render(<Application />, wrapper);
} else {
    console.error("No wrapper element found");
}