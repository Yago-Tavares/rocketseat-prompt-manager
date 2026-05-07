import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'node:util';

expect.extend({});

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
