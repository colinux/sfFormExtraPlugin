var sfDoubleList =
{
  init: function(id, className)
  {
    form = sfDoubleList.get_current_form(id);

    callback = function() { sfDoubleList.submit(form, className) };

    if (form.addEventListener)
    {
      form.addEventListener("submit", callback, false);
    }
    else if (form.attachEvent)
    {
      var r = form.attachEvent("onsubmit", callback);
    }
  },

  move: function(srcId, destId)
  {
    var src = document.getElementById(srcId);
    var dest = document.getElementById(destId);
    var destGroups = {};
    for (var i = 0; i < dest.childNodes.length; i++)
    {
      if (dest.childNodes[i].nodeName.toLowerCase() == "optgroup")
      {
        destGroups[dest.childNodes[i].getAttribute("label")] = dest.childNodes[i];
      }
    }
    for (var i = 0; i < src.options.length; i++)
    {
      if (src.options[i].selected)
      {
        var newChild = new Option(src.options[i].text, src.options[i].value);
        if (src.options[i].parentNode.nodeName.toLowerCase() == "optgroup")
        {
          var groupLabel = src.options[i].parentNode.getAttribute("label");
          if (!destGroups.hasOwnProperty(groupLabel))
          {
            destGroups[groupLabel] = document.createElement("optgroup");
            destGroups[groupLabel].setAttribute("label", groupLabel);
            dest.appendChild(destGroups[groupLabel]);
          }
          destGroups[groupLabel].appendChild(newChild);
        }
        else
        {
          dest.options[dest.length] = newChild;
        }
        
        src.options[i] = null;
        --i;
      }
    }
  },

  submit: function(form, className)
  {
    var element;

    for (var i = 0; i < form.elements.length; i++)
    {
      element = form.elements[i];
      if (element.type == 'select-multiple')
      {
        if (element.className == className + '-selected')
        {
          for (var j = 0; j < element.options.length; j++)
          {
            element.options[j].selected = true;
          }
        }
      }
    }
  },

  get_current_form: function(el)
  {
    if ("form" != el.tagName.toLowerCase())
    {
      return sfDoubleList.get_current_form(el.parentNode);
    }

    return el;
  }
};
