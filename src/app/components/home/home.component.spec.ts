import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { of } from 'rxjs';
import { Trending } from 'src/types/Movies';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiService;

  const mockTrending: Trending = {
    page: 1,
    results: [
      {
        id: 1,
        original_title: 'Movie 1',
        poster_path: 'path/to/poster',
      },
      {
        id: 2,
        original_title: 'Movie 2',
        poster_path: 'path/to/poster',
      },
    ],
    total_results: 2,
    total_pages: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      providers: [ApiService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTrendingMovies method of ApiService on initialization', () => {
    const getTrendingMoviesSpy = jest.spyOn(apiService, 'getTrendingMovies').mockReturnValue(of(mockTrending));
    component.ngOnInit();
    expect(getTrendingMoviesSpy).toHaveBeenCalled();
  });
});
