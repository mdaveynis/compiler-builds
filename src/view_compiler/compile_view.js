/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { rendererTypeName, tokenName, viewClassName } from '../compile_metadata';
import { EventHandlerVars } from '../compiler_util/expression_converter';
import { isPresent } from '../facade/lang';
import * as o from '../output/output_ast';
import { ViewType } from '../private_import_core';
import { CompileMethod } from './compile_method';
import { CompilePipe } from './compile_pipe';
import { CompileQuery, addQueryToTokenMap, createQueryList } from './compile_query';
import { getPropertyInView } from './util';
export let CompileViewRootNodeType = {};
CompileViewRootNodeType.Node = 0;
CompileViewRootNodeType.ViewContainer = 1;
CompileViewRootNodeType.NgContent = 2;
CompileViewRootNodeType[CompileViewRootNodeType.Node] = "Node";
CompileViewRootNodeType[CompileViewRootNodeType.ViewContainer] = "ViewContainer";
CompileViewRootNodeType[CompileViewRootNodeType.NgContent] = "NgContent";
export class CompileViewRootNode {
    /**
     * @param {?} type
     * @param {?} expr
     * @param {?=} ngContentIndex
     */
    constructor(type, expr, ngContentIndex) {
        this.type = type;
        this.expr = expr;
        this.ngContentIndex = ngContentIndex;
    }
}
function CompileViewRootNode_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileViewRootNode.prototype.type;
    /** @type {?} */
    CompileViewRootNode.prototype.expr;
    /** @type {?} */
    CompileViewRootNode.prototype.ngContentIndex;
}
export class CompileView {
    /**
     * @param {?} component
     * @param {?} genConfig
     * @param {?} pipeMetas
     * @param {?} styles
     * @param {?} animations
     * @param {?} viewIndex
     * @param {?} declarationElement
     * @param {?} templateVariableBindings
     * @param {?} targetDependencies
     */
    constructor(component, genConfig, pipeMetas, styles, animations, viewIndex, declarationElement, templateVariableBindings, targetDependencies) {
        this.component = component;
        this.genConfig = genConfig;
        this.pipeMetas = pipeMetas;
        this.styles = styles;
        this.animations = animations;
        this.viewIndex = viewIndex;
        this.declarationElement = declarationElement;
        this.templateVariableBindings = templateVariableBindings;
        this.targetDependencies = targetDependencies;
        this.viewChildren = [];
        this.nodes = [];
        this.rootNodes = [];
        this.lastRenderNode = o.NULL_EXPR;
        this.viewContainers = [];
        this.methods = [];
        this.ctorStmts = [];
        this.fields = [];
        this.getters = [];
        this.disposables = [];
        this.purePipes = new Map();
        this.pipes = [];
        this.locals = new Map();
        this.literalArrayCount = 0;
        this.literalMapCount = 0;
        this.pipeCount = 0;
        this.createMethod = new CompileMethod(this);
        this.animationBindingsMethod = new CompileMethod(this);
        this.injectorGetMethod = new CompileMethod(this);
        this.updateContentQueriesMethod = new CompileMethod(this);
        this.dirtyParentQueriesMethod = new CompileMethod(this);
        this.updateViewQueriesMethod = new CompileMethod(this);
        this.detectChangesInInputsMethod = new CompileMethod(this);
        this.detectChangesRenderPropertiesMethod = new CompileMethod(this);
        this.afterContentLifecycleCallbacksMethod = new CompileMethod(this);
        this.afterViewLifecycleCallbacksMethod = new CompileMethod(this);
        this.destroyMethod = new CompileMethod(this);
        this.detachMethod = new CompileMethod(this);
        this.viewType = getViewType(component, viewIndex);
        this.className = viewClassName(component.type.reference, viewIndex);
        this.rendererTypeName = rendererTypeName(component.type.reference);
        this.classType = o.expressionType(o.variable(this.className));
        this.classExpr = o.variable(this.className);
        if (this.viewType === ViewType.COMPONENT || this.viewType === ViewType.HOST) {
            this.componentView = this;
        }
        else {
            this.componentView = this.declarationElement.view.componentView;
        }
        this.componentContext =
            getPropertyInView(o.THIS_EXPR.prop('context'), this, this.componentView);
        const viewQueries = new Map();
        if (this.viewType === ViewType.COMPONENT) {
            const directiveInstance = o.THIS_EXPR.prop('context');
            this.component.viewQueries.forEach((queryMeta, queryIndex) => {
                const propName = `_viewQuery_${tokenName(queryMeta.selectors[0])}_${queryIndex}`;
                const queryList = createQueryList(propName, this);
                const query = new CompileQuery(queryMeta, queryList, directiveInstance, this);
                addQueryToTokenMap(viewQueries, query);
            });
        }
        this.viewQueries = viewQueries;
        templateVariableBindings.forEach((entry) => { this.locals.set(entry[1], o.THIS_EXPR.prop('context').prop(entry[0])); });
        if (!this.declarationElement.isNull()) {
            this.declarationElement.setEmbeddedView(this);
        }
    }
    /**
     * @param {?} name
     * @param {?} input
     * @param {?} args
     * @return {?}
     */
    callPipe(name, input, args) {
        return CompilePipe.call(this, name, [input].concat(args));
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getLocal(name) {
        if (name == EventHandlerVars.event.name) {
            return EventHandlerVars.event;
        }
        let /** @type {?} */ currView = this;
        let /** @type {?} */ result = currView.locals.get(name);
        while (!result && isPresent(currView.declarationElement.view)) {
            currView = currView.declarationElement.view;
            result = currView.locals.get(name);
        }
        if (isPresent(result)) {
            return getPropertyInView(result, this, currView);
        }
        else {
            return null;
        }
    }
    /**
     * @return {?}
     */
    finish() {
        Array.from(this.viewQueries.values())
            .forEach(queries => queries.forEach(q => q.generateStatements(this.createMethod, this.updateViewQueriesMethod)));
    }
}
function CompileView_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileView.prototype.viewType;
    /** @type {?} */
    CompileView.prototype.viewQueries;
    /** @type {?} */
    CompileView.prototype.viewChildren;
    /** @type {?} */
    CompileView.prototype.nodes;
    /** @type {?} */
    CompileView.prototype.rootNodes;
    /** @type {?} */
    CompileView.prototype.lastRenderNode;
    /** @type {?} */
    CompileView.prototype.viewContainers;
    /** @type {?} */
    CompileView.prototype.createMethod;
    /** @type {?} */
    CompileView.prototype.animationBindingsMethod;
    /** @type {?} */
    CompileView.prototype.injectorGetMethod;
    /** @type {?} */
    CompileView.prototype.updateContentQueriesMethod;
    /** @type {?} */
    CompileView.prototype.dirtyParentQueriesMethod;
    /** @type {?} */
    CompileView.prototype.updateViewQueriesMethod;
    /** @type {?} */
    CompileView.prototype.detectChangesInInputsMethod;
    /** @type {?} */
    CompileView.prototype.detectChangesRenderPropertiesMethod;
    /** @type {?} */
    CompileView.prototype.afterContentLifecycleCallbacksMethod;
    /** @type {?} */
    CompileView.prototype.afterViewLifecycleCallbacksMethod;
    /** @type {?} */
    CompileView.prototype.destroyMethod;
    /** @type {?} */
    CompileView.prototype.detachMethod;
    /** @type {?} */
    CompileView.prototype.methods;
    /** @type {?} */
    CompileView.prototype.ctorStmts;
    /** @type {?} */
    CompileView.prototype.fields;
    /** @type {?} */
    CompileView.prototype.getters;
    /** @type {?} */
    CompileView.prototype.disposables;
    /** @type {?} */
    CompileView.prototype.componentView;
    /** @type {?} */
    CompileView.prototype.purePipes;
    /** @type {?} */
    CompileView.prototype.pipes;
    /** @type {?} */
    CompileView.prototype.locals;
    /** @type {?} */
    CompileView.prototype.className;
    /** @type {?} */
    CompileView.prototype.rendererTypeName;
    /** @type {?} */
    CompileView.prototype.classType;
    /** @type {?} */
    CompileView.prototype.classExpr;
    /** @type {?} */
    CompileView.prototype.literalArrayCount;
    /** @type {?} */
    CompileView.prototype.literalMapCount;
    /** @type {?} */
    CompileView.prototype.pipeCount;
    /** @type {?} */
    CompileView.prototype.componentContext;
    /** @type {?} */
    CompileView.prototype.component;
    /** @type {?} */
    CompileView.prototype.genConfig;
    /** @type {?} */
    CompileView.prototype.pipeMetas;
    /** @type {?} */
    CompileView.prototype.styles;
    /** @type {?} */
    CompileView.prototype.animations;
    /** @type {?} */
    CompileView.prototype.viewIndex;
    /** @type {?} */
    CompileView.prototype.declarationElement;
    /** @type {?} */
    CompileView.prototype.templateVariableBindings;
    /** @type {?} */
    CompileView.prototype.targetDependencies;
}
/**
 * @param {?} component
 * @param {?} embeddedTemplateIndex
 * @return {?}
 */
function getViewType(component, embeddedTemplateIndex) {
    if (embeddedTemplateIndex > 0) {
        return ViewType.EMBEDDED;
    }
    if (component.isHost) {
        return ViewType.HOST;
    }
    return ViewType.COMPONENT;
}
//# sourceMappingURL=compile_view.js.map