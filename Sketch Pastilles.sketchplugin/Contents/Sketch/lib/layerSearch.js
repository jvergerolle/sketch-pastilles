/*
    From Abstract Layer Search Functions by Aby Nimbalkar
    https://gist.github.com/abynim/4e1d4754f990cfc933ae
*/

var findLayersMatchingPredicate_inContainer_filterByType = function(predicate, container, layerType) {
    var scope;
    switch (layerType) {
        case MSPage :
            scope = doc.pages()
            return scope.filteredArrayUsingPredicate(predicate)
        break;

        case MSArtboardGroup :
            if(typeof container !== 'undefined' && container != nil) {
                if (container.className == "MSPage") {
                    scope = container.artboards()
                    return scope.filteredArrayUsingPredicate(predicate)
                }
            } else {
                // search all pages
                var filteredArray = NSArray.array()
                var loopPages = doc.pages().objectEnumerator(), page;
                while (page = loopPages.nextObject()) {
                    scope = page.artboards()
                    filteredArray = filteredArray.arrayByAddingObjectsFromArray(scope.filteredArrayUsingPredicate(predicate))
                }
                return filteredArray
            }
        break;

        default :
            if(typeof container !== 'undefined' && container != nil) {
                scope = container.children()
                return scope.filteredArrayUsingPredicate(predicate)
            } else {
                // search all pages
                var filteredArray = NSArray.array()
                var loopPages = doc.pages().objectEnumerator(), page;
                while (page = loopPages.nextObject()) {
                    scope = page.children()
                    filteredArray = filteredArray.arrayByAddingObjectsFromArray(scope.filteredArrayUsingPredicate(predicate))
                }
                return filteredArray
            }
    }
    return NSArray.array() // Return an empty array if no matches were found
}

var findFirstLayerMatchingPredicate_inContainer_filterByType = function(predicate, container, layerType) {
    var filteredArray = findLayersMatchingPredicate_inContainer_filterByType(predicate, container, layerType)
    return filteredArray.firstObject()
}

/*
    Find any text layer in container

    Tweaked from Find Text Layers Containing String by Aby Nimbalkar
    https://gist.github.com/abynim/d24f0efc2b9b238f5881
*/

var findTextLayer_inContainer = function(container) {
    var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'");
    return findLayersMatchingPredicate_inContainer_filterByType(predicate, container);
}
