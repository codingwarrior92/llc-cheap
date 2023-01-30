import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsComponent } from './cms.component';

// PAGES
import { CategoryModule } from './category/category.module';
import { PostModule } from './post/post.module';
import { SearchModule } from './search/search.module';
import { TaxonomyModule } from './taxonomy/taxonomy.module';



@NgModule({
  declarations: [
    CmsComponent
  ],
  imports: [
    CommonModule,
    CategoryModule,
    PostModule,
    SearchModule,
    TaxonomyModule
  ]
})
export class CmsModule { }
