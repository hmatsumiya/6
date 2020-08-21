function InitChild (parent) {
    if (parent.removeChild(parent.firstChild)) {
	while (parent.firstChild)
	    parent.removeChild(parent.firstChild);
    }
};

function AddElement (parent, child_element, id_name, class_name, type, child_text) {
    let child = document.createElement(child_element);
    if (id_name !== null) child.id=id_name;
    if (class_name !== null) child.className=class_name;
    if (type !== null) child.type=type;
    if (child_text !== null) {
	let textnode = document.createTextNode(child_text);
	child.appendChild(textnode);
    }
    parent.appendChild(child);
};
