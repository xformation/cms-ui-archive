import coreModule from '../core_module';
import angular from 'angular';

export function RecursionHelper($compile) {
	return {
		compile: (element, link) => {
			if (angular.isFunction(link)) {
				link = { post: link };
			}
			const contents = element.contents().remove();
			let compiledContents;
			return {
				pre: (link && link.pre) ? link.pre : null,
				post: (scope, element) => {
					if (!compiledContents) {
						compiledContents = $compile(contents);
					}
					compiledContents(scope, (clone) => {
						element.append(clone);
					});
					if (link && link.post) {
						link.post.apply(null, [scope, element]);
					}
				}
			};
		}
	};
}

coreModule.factory('RecursionHelper', ['$compile', RecursionHelper]);
