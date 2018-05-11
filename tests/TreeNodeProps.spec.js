/* eslint-disable no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Tree, { TreeNode } from '..';

/**
 * For refactor purpose. All the props should be passed by test
 */

describe('TreeNode Props', () => {
  // prefixCls - is defined by Tree, TreeNode can not change it
  // expanded - is defined by Tree, TreeNode can not change it

  it('className', () => {
    const wrapper = render(
      <Tree defaultExpandAll>
        <TreeNode>
          <TreeNode className="tree-node-cls">
            <TreeNode />
          </TreeNode>
          <TreeNode />
        </TreeNode>
        <TreeNode />
      </Tree>
    );
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  // disabled - is already full test in Tree.spec.js
  // disableCheckbox - is already full test in Tree.spec.js
  // title - is already full test in Tree.spec.js
  // key - is already full test in Tree.spec.js

  it('isLeaf', () => {
    const withoutLoadData = render(
      <Tree showIcon={false} defaultExpandAll>
        <TreeNode isLeaf>
          <TreeNode isLeaf />
        </TreeNode>
      </Tree>
    );
    expect(renderToJson(withoutLoadData)).toMatchSnapshot();

    const withLoadData = render(
      <Tree defaultExpandAll>
        <TreeNode isLeaf>
          <TreeNode isLeaf />
        </TreeNode>
      </Tree>
    );
    expect(renderToJson(withLoadData)).toMatchSnapshot();
  });

  describe('customize icon', () => {
    it('element', () => {
      const withoutLoadData = render(
        <Tree defaultExpandAll>
          <TreeNode icon={<span className="cust-icon" />} />
        </Tree>
      );
      expect(renderToJson(withoutLoadData)).toMatchSnapshot();
    });

    it('component', () => {
      const Icon = () => (
        <span className="cust-icon" />
      );

      const withoutLoadData = render(
        <Tree defaultExpandAll>
          <TreeNode icon={Icon} />
        </Tree>
      );
      expect(renderToJson(withoutLoadData)).toMatchSnapshot();
    });

    it('hide icon', () => {
      const withoutLoadData = render(
        <Tree showIcon={false} defaultExpandAll>
          <TreeNode icon={<span className="cust-icon" />} />
        </Tree>
      );
      expect(renderToJson(withoutLoadData)).toMatchSnapshot();
    });

    it('get props when loading', () => {
      const then = jest.fn(() => Promise.resolve());
      const loadData = jest.fn(() => ({ then }));
      const iconFn = jest.fn(() => null);
      const wrapper = mount(
        <Tree loadData={loadData}>
          <TreeNode icon={iconFn} title="parent 1" key="0-0" />
        </Tree>
      );

      wrapper.find('.rc-tree-switcher').simulate('click');

      expect(iconFn.mock.calls[0][0].loading).toBe(false);
      expect(iconFn.mock.calls[1][0].loading).toBe(true);
    });
  });
});
