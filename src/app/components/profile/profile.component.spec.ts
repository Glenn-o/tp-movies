import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { User, UsersService } from '../../shared/services/users.service';
import { ProfileComponent } from './profile.component';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthenticationService;
  let usersService: UsersService;
  let route: ActivatedRoute;
  let router: Router;

  const userMock: User = {
     userId: 'user123',
        email: 'test@test.com',
        username: 'TestUser',
        avatar: 'https://test.com/avatar.png',
  };

  const usersServiceMock = {
    getUserInfoById: jest.fn().mockReturnValue(of([])),
  };

  const authServiceMock = {
    user$: of(userMock),
  };

  const routeMock = {
    snapshot: {
      paramMap: {
        get: jest.fn(),
      },
    },
  };

  const routerMock = {
    navigateByUrl: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        { provide: AuthenticationService, useValue: authServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ActivatedRoute, useValue: routeMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    usersService = TestBed.inject(UsersService);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user info by id on component init', () => {
    const id = 'user123';
    const getUserInfoByIdSpy = jest.spyOn(usersService, 'getUserInfoById');
    routeMock.snapshot.paramMap.get.mockReturnValue(id);

    component.ngOnInit();

    expect(getUserInfoByIdSpy).toHaveBeenCalledWith(id);
  });

  it('should set user info if user info is found', () => {
    const userInfo: User[] = [
      {
        userId: 'user123',
        email: 'test@test.com',
        username: 'TestUser',
        avatar: 'https://test.com/avatar.png',
      },
    ];
    usersServiceMock.getUserInfoById.mockReturnValue(of(userInfo));

    component.ngOnInit();

    expect(component.userInfo).toEqual(userInfo[0]);
  });
});
