import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private title: Title, private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      card: 'summary',
      type: 'website',
      ...config
    }

    // TITLE
    this.title.setTitle(config.title);

    // DESCRIPTION
    if (config.description !== undefined) {
      this.meta.updateTag({ name: 'description', content: config.description });
    }

    // TWITTER
    this.meta.updateTag({ name: 'twitter:card', content: config.card });
    this.meta.updateTag({ name: 'twitter:site', content: '@grceri' });
    if (config.title !== undefined) {
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }
    if (config.description !== undefined) {
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }
    if (config.image !== undefined) {
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }

    // SOCIAL
    this.meta.updateTag({ property: 'og:type', content: config.type });
    this.meta.updateTag({ property: 'og:site_name', content: 'Grceri' });
    if (config.title !== undefined) {
      this.meta.updateTag({ property: 'og:title', content: config.title });
    }
    if (config.description !== undefined) {
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }
    if (config.image !== undefined) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
    }
    if (config.url !== undefined) {
      this.meta.updateTag({ property: 'og:url', content: `http://grceri.com/${config.url}` });
    }
  }

  addMetaTags(config) {
    // default values
    config = {
      card: 'summary',
      type: 'website',
      ...config
    }

    // TITLE
    this.title.setTitle(config.title);

    // TWITTER
    this.meta.addTag({ name: 'twitter:card', content: config.card });
    this.meta.addTag({ name: 'twitter:site', content: '@grceri' });

    // SOCIAL
    this.meta.addTag({ property: 'og:type', content: config.type });
    this.meta.addTag({ property: 'og:site_name', content: 'Grceri' });
  }

  updateMetaTags(config) {
    // TITLE
    this.title.setTitle(config.title);

    // DESCRIPTION
    this.meta.updateTag({ name: 'description', content: config.description });

    // TWITTER
    this.meta.updateTag({ name: 'twitter:card', content: config.card });
    this.meta.updateTag({ name: 'twitter:site', content: '@grceri' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    // SOCIAL
    this.meta.updateTag({ property: 'og:type', content: config.type });
    this.meta.updateTag({ property: 'og:site_name', content: 'Grceri' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `http://grceri.com${config.url}` });

    // let description: HTMLMetaElement = this.meta.getTag('name = "description"');
    // console.log(description);
  }

  removeMetaTags() {
    let description: HTMLMetaElement = this.meta.getTag('name = "description"');
    this.meta.removeTagElement(description);
    let twitterCard: HTMLMetaElement = this.meta.getTag('name = "twitter:card"');
    this.meta.removeTagElement(twitterCard);
    let twitterSite: HTMLMetaElement = this.meta.getTag('name = "twitter:site"');
    this.meta.removeTagElement(twitterSite);
    let twitterTitle: HTMLMetaElement = this.meta.getTag('name = "twitter:title"');
    this.meta.removeTagElement(twitterTitle);
    let twitterDescription: HTMLMetaElement = this.meta.getTag('name = "twitter:description"');
    this.meta.removeTagElement(twitterDescription);
    let twitterImage: HTMLMetaElement = this.meta.getTag('name = "twitter:image"');
    this.meta.removeTagElement(twitterImage);

    let ogType: HTMLMetaElement = this.meta.getTag('name = "og:type"');
    this.meta.removeTagElement(ogType);
    let ogSite: HTMLMetaElement = this.meta.getTag('name = "og:site_name"');
    this.meta.removeTagElement(ogSite);
    let ogTitle: HTMLMetaElement = this.meta.getTag('name = "og:title"');
    this.meta.removeTagElement(ogTitle);
    let ogDescription: HTMLMetaElement = this.meta.getTag('name = "og:description"');
    this.meta.removeTagElement(ogDescription);
    let ogImage: HTMLMetaElement = this.meta.getTag('name = "og:image"');
    this.meta.removeTagElement(ogImage);
    let ogURL: HTMLMetaElement = this.meta.getTag('name = "og:url"');
    this.meta.removeTagElement(ogURL);
  }
}
