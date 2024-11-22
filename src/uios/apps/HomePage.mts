/**
 * *****************************************************************************
 *
 * HomePage application
 *
 * *****************************************************************************
 */

import { createElement as e, useState } from "react";

import {
  Alert,
  Accordion,
  Button,
  Input,
  Select,
  Copyright,
  Breadcrumb,
  MarkdownPreview,
} from "../components/index.mts";

export function HomePage () {
  const [ count, setCount ] = useState(0);

  const handleClick = () => setCount(count + 1);
  const copyright = e(Copyright, { year: 2021 });
  const button = e(Button, {
    theme: "success",
    onClick: handleClick, 
  }, "button" + count);

  // return createElement(Layout, { footer: copyright, className: "fixed-bottom" });
  const input = e(Input, {
    key: 1,
    floating: true,
    group: true,
    type: "text",
    label: "姓名",
    description: "description",
    multiple: true,
    placeholder: "tttt",
  });

  const select = e(Select, {
    key: 2,
    options: ["test", "abc"],
    tips: "选择一个项目",
    defaultValue: "test",
  });

  const checkbox = e(Input, {
    key: 3,
    type: "checkbox",
    checked: true,
    switcher: true,
    text: "text tttt",
    required: true,
  });

  const radio = e(Input, {
    key: 4,
    type: "range",
  });

  const alert = e(Alert, {
    key: 5
  }, "alert message");
  const breadcrumb = e(Breadcrumb, { 
    key: 6,
    data: [
      { item: "A", href: "#"},
      { item: "B", href: "#"},
      { item: "C", href: "#"},
  ], divider: ">"});

  const test = e(MarkdownPreview, {
    markdown: "## test \nabcd\nhello **world**!"
  });

  const btn1 = e(Button, null, "Search");
  const test1 = e("form", { action: submitHandler },
    e("input", { name: "query" }),
    btn1,
  );


  return e("div", null, input, select, checkbox, radio, alert, breadcrumb, test,
      test1,
  );
}

function submitHandler (formData) {
  console.log(formData.get("query"));
}
