import React from 'react';

export default function () {

  return (
    <div>
      <span>index1</span>
      <div>index2</div>
      <bdo dir='rtl'>this is a text</bdo>
      <mark>123</mark>
      <input type='color'/>
      <p draggable="true" ondragstart="alert('dragstart')">Drag me!Drag me!!</p>
      <form action="www.camnpr.com/" method="post">
        <input list="jslib" name="jslib"/>
        <datalist id="jslib">
             <option value="jQuery"/>
             <option value="Dojo"/>
             <option value="Prototype"/>
             <option value="Augular"/>
        </datalist>
        <input type="submit" value="完成" />
      </form>
    </div>
  );
}
