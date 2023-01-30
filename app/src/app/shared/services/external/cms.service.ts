import { Injectable } from '@angular/core';

// CMS

// HTML FORMATTER
// let PrismicDOM = require('prismic-dom');
// let Elements = PrismicDOM.RichText.Elements;


@Injectable()
export class CMSService {
  constructor() { }

  // latestPost() {
  //   let p = new Promise((resolve, reject) => {
  //     Prismic.getApi(api).then((r: any) => {
  //       r.query([
  //         Prismic.Predicates.at('document.type', 'post')],
  //         { pageSize: 1 }
  //       ).then((res: any) => {
  //         resolve(res.results);
  //       });
  //     })
  //   });

  //   return p;
  // }

  // searchPosts(query: any, page: any) {
  //   let p = new Promise((resolve, reject) => {
  //     Prismic.getApi(api).then((r: any) => {
  //       r.query([
  //         Prismic.Predicates.at('document.type', 'post'),
  //         Prismic.Predicates.fulltext('document', query)],
  //         { pageSize: 10, page: page }
  //       ).then((res: any) => {
  //         resolve(r.results);
  //       });
  //     })
  //   });

  //   return p;
  // }

  // posts(tag: string) {
  //   let p = new Promise((resolve, reject) => {
  //     Prismic.getApi(api).then((r: any) => {
  //       r.query(
  //         Prismic.Predicates.at('document.tags', [tag]),
  //         { orderings: '[my.' + tag + '.date desc]' }
  //       ).then((res: any) => {
  //         resolve(res.results);
  //       });
  //     })
  //   });

  //   return p;
  // }

  // postsNumber(tag: any, number: any) {
  //   let p = new Promise((resolve, reject) => {
  //     Prismic.getApi(api).then((r: any) => {
  //       r.query(
  //         Prismic.Predicates.at('document.tags', [tag]),
  //         { pageSize: number, page: 1 }
  //       ).then((res: any) => {
  //         resolve(res.results);
  //       });
  //     })
  //   });

  //   return p;
  // }

  // post(type: string, uid: any) {
  //   let p = new Promise((resolve, reject) => {
  //     Prismic.getApi(api).then((r: any) => {
  //       r.query(
  //         Prismic.Predicates.at('my.' + type + '.uid', uid)
  //       ).then((res: any) => {
  //         resolve(res.results);
  //       });
  //     })
  //   });

  //   return p;
  // }

  // content(content: any) {
  //   return PrismicDOM.RichText.asHtml(content, this.linkResolver, this.htmlSerializer)
  // }

  // date(date: any) {
  //   return PrismicDOM.Date(date);
  // }

  // title(name: any) {
  //   return PrismicDOM.RichText.asHtml(name, this.linkResolver);
  // }

  // toStandardTime(militaryTime: any) {
  //   militaryTime = militaryTime.split(':');
  //   return (militaryTime[0].charAt(0) === 1 && militaryTime[0].charAt(1) > 2) ? (militaryTime[0] - 12) + ':' + militaryTime[1] + ':' + militaryTime[2] + ' P.M.' : militaryTime.join(':') + ' A.M.'
  // }


  // private linkResolver = function (doc: { type: string; uid: string; tags: string; id: string; }) {
  //   // Pretty URLs for known types
  //   if (doc.type === 'policy') { return '/policy/' + doc.uid; }
  //   if (doc.type === 'post') { return '/blog/' + doc.tags + doc.uid; }
  //   // Fallback for other types, in case new custom types get created
  //   return '/doc/' + doc.id;
  // };

  // private htmlSerializer = function (type: any, element: { linkTo: { target: any; }; label: any; url: any; alt: any; copyright: any; oembed: { embed_url: any; type: any; provider_name: any; html: any; }; data: { target: any; url: any; label: any; }; }, content: string, children: any[]) {
  //   switch (type) {
  //     case Elements.heading1: return `<h1>${children.join('')}</h1>`;
  //     case Elements.heading2: return `<h2>${children.join('')}</h2>`;
  //     case Elements.heading3: return `<h3>${children.join('')}</h3>`;
  //     case Elements.heading4: return `<h4>${children.join('')}</h4>`;
  //     case Elements.heading5: return `<h5>${children.join('')}</h5>`;
  //     case Elements.heading6: return `<h6>${children.join('')}</h6>`;
  //     case Elements.paragraph: return `<p>${children.join('')}</p>`;
  //     case Elements.preformatted: return `<pre>${children.join('')}</pre>`;
  //     case Elements.strong: return `<strong>${children.join('')}</strong>`;
  //     case Elements.em: return `<em>${children.join('')}</em>`;
  //     case Elements.listItem: return `<li>${children.join('')}</li>`;
  //     case Elements.oListItem: return `<li>${children.join('')}</li>`;
  //     case Elements.list: return `<ul>${children.join('')}</ul>`;
  //     case Elements.oList: return `<ol>${children.join('')}</ol>`;
  //     case Elements.image:
  //       let linkUrl = element.linkTo ? PrismicDOM.Link.url(element.linkTo, module.exports.linkResolver) : null;
  //       let linkTarget = element.linkTo && element.linkTo.target ? `target="${element.linkTo.target}" rel="noopener"` : '';
  //       let wrapperClassList = [element.label || '', 'block-img'];
  //       let img = `<img  src="${element.url}" alt="${element.alt || ''}" copyright="${element.copyright || ''}">`;
  //       return (`
  // 				<p class="${wrapperClassList.join(' ')}">
  // 					${linkUrl ? `<a ${linkTarget} href="${linkUrl}">${img}</a>` : img}
  // 				</p>
  // 			`);
  //     case Elements.embed:
  //       return (`
  // 				<div data-oembed="${element.oembed.embed_url}"
  // 					data-oembed-type="${element.oembed.type}"
  // 					data-oembed-provider="${element.oembed.provider_name}"
  // 				>
  // 					${element.oembed.html}
  // 				</div>
  // 			`);
  //     case Elements.hyperlink:
  //       let target = element.data.target ? `target="${element.data.target}" rel="noopener"` : '';
  //       linkUrl = PrismicDOM.Link.url(element.data, element.data.url);
  //       return `<a ${target} href="${linkUrl}">${children.join('')}</a>`
  //     case Elements.label:
  //       let label = element.data.label ? ` class="${element.data.label}"` : '';
  //       return `<span ${label}>${children.join('')}</span>`;
  //     case Elements.span: return content ? content.replace(/\n/g, '<br />') : '';
  //     default: return null;
  //   }
  // };
}
