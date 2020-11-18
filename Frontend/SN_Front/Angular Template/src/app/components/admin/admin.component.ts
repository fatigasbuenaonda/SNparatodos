import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  public news: any;
  public new: any;
  public interviews: any;
  public interview: any;
  public users: any;
  public f: FormGroup;
  public selectedFile: File = null;

  constructor(private newsService: NewsService, private fb: FormBuilder, private authService: AuthService, private router: Router) {

    this.f = fb.group({
      id: ['', Validators.compose([
        Validators.required
      ])],
      picture: [''],
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ])],
      text: ['', Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000)
      ])]
    });
     }


  public async ngOnInit(): Promise<void> {
    await this.getAllNews();
    //await this.getAllInterviews();
    //await this.getAllUsers();
    console.log('Acá imprimo las NEWS:', this.news);
    //console.log('Acá imprimo las INTERVIEWS:', this.interviews);
    //console.log('Acá imprimo los USERS:', this.users);
  }

  private async getAllUsers(): Promise<any> {
    this.users = await this.newsService.getUsers().catch((error) => {
      console.log('Error al buscar los USERS!', error);
    });
  }

  private async getAllNews(): Promise<any> {
    this.news = await this.newsService.getNews().catch((error) => {
      console.log('Error al buscar las NEWS!!!!!', error);
    });
  }

  private async postNews(news): Promise<any> {
    this.new = await this.newsService.postNews(news).catch((error) => {
      console.log('Error al postear la NEWS!', error);
    });
  }

  private async delNews(id): Promise<any> {
    this.new = await this.newsService.deleteNews(id).catch((error) => {
      console.log('Error al borrar la NEWS!', error);
    });
  }

  private async getAllInterviews(): Promise<any> {
    this.interviews = await this.newsService.getInterviews().catch((error) => {
      console.log('Error al buscar las INTERVIEWS!', error);
    });
  }

  private async postInterviews(interviews): Promise<any> {
    this.interview = await this.newsService.postInterviews(interviews).catch((error) => {
      console.log('Error al postear la INTERVIEW!', error);
    });
  }

  private async delInterviews(id): Promise<any> {
    this.interview = await this.newsService.deleteInterviews(id).catch((error) => {
      console.log('Error al borrar la INTERVIEWS!', error);
    });
  }



  public async enviarNews(){
    console.log(this.f.value);
    await this.postNews(this.f.value);
  }

  public async enviarInterviews(){
    console.log(this.f.value);
    await this.postInterviews(this.f.value);
  }

  public async borrarNews(){
    console.log(this.f.value.id);
    await this.delNews(this.f.value.id);
    this.f.reset();
  }

  public async borrarInterviews(){
    console.log(this.f.value.id);
    await this.delInterviews(this.f.value.id);
    this.f.reset();
  }

  public async onLogout(){
    this.authService.logout();
    console.log('Hacemos el Log out!');
    this.router.navigateByUrl('/');
  }

/*
  onFileSelected(event: any): void{
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.f.patchValue({
      fileSource: this.selectedFile
    });
  } */






/*     const news = {
      id: 778,
      picture: 'Picture 777',
      title: 'Title 777',
      text: 'Texto 777'
    }; */

}

