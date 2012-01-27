/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Raindrop.
 *
 * The Initial Developer of the Original Code is
 * Mozilla Messaging, Inc..
 * Portions created by the Initial Developer are Copyright (C) 2012
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * */

"use strict";

define([ "require", "jquery",
         "less", "osTheme",
         ],
function (require,   $,
          less,   osTheme) {

  //Start processing of less files right away.
  require(['text!style/' + osTheme + '.css', 'text!style.css'],
    function (osText, styleText) {
    (new less.Parser()).parse(osText + styleText, function (err, css) {
      if (err) {
        dump("Failed to setup style-sheet: " + err.name + "/" + err.message+"\n");
        if (typeof console !== 'undefined' && console.error) {
          console.error(err);
        }
      } else {
        var style = document.createElement('style');
        style.type = 'text/css';
        try{
          style.textContent = css.toCSS();
        } catch(e) {
          dump("less error: "+JSON.stringify(e)+"\n");
        }
        document.head.appendChild(style);
        document.body.style.display = 'block';
      }
    });
  });


  $('body')
    .delegate('#statusAuthButton, .statusErrorButton', 'click', function (evt) {
      resetStatus();
    });

  function resetStatus() {
    $('#clickBlock').addClass('hidden');
    $('div.status').addClass('hidden');
  }
  
  return {
    showStatus: function(statusId) {
      $('div.status').addClass('hidden');
      $('#clickBlock').removeClass('hidden');
      $('#' + statusId).removeClass('hidden');
    }
  };
});

