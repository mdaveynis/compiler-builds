/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HtmlParser } from '../html_parser/html_parser';
import { InterpolationConfig } from '../html_parser/interpolation_config';
import { ParseError } from '../parse_util';
import * as i18n from './i18n_ast';
import { Serializer } from './serializers/serializer';
/**
 * A container for message extracted from the templates.
 */
export declare class MessageBundle {
    private _htmlParser;
    private _implicitTags;
    private _implicitAttrs;
    private _messageMap;
    constructor(_htmlParser: HtmlParser, _implicitTags: string[], _implicitAttrs: {
        [k: string]: string[];
    });
    updateFromTemplate(html: string, url: string, interpolationConfig: InterpolationConfig): ParseError[];
    write(serializer: Serializer): string;
}
export declare function serializeAst(ast: i18n.Node[]): string[];