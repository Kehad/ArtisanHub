/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Fix for React 19 + React Native types conflict.
 * The error "JSX element class does not support attributes because it does not have a 'props' property"
 * happens because of a mismatch in JSX.ElementClass definition.
 */

import 'react';

declare global {
    namespace JSX {
        // Overriding ElementClass to any allows us to bypass the strict check 
        // that fails for React Native components in this setup.
        type ElementClass = any;
    }
}
