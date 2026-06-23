import { render, screen, fireEvent } from '@testing-library/react';
import Nav from './Nav';

describe('Nav component', () => {
  it('рендерит логотип', () => {
    render(<Nav />);

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  it('меню скрыто по умолчанию', () => {
    render(<Nav />);

    expect(screen.queryByText('Главное')).not.toBeInTheDocument();
    expect(screen.queryByText('Мой плейлист')).not.toBeInTheDocument();
    expect(screen.queryByText('Войти')).not.toBeInTheDocument();
  });

  it('открывает меню по клику на бургер', () => {
    render(<Nav />);

    const burger = document.querySelector(`.${'nav__burger'}`);
    fireEvent.click(burger!);

    expect(screen.getByText('Главное')).toBeInTheDocument();
    expect(screen.getByText('Мой плейлист')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('переключает меню (open/close)', () => {
    render(<Nav />);

    const burger = document.querySelector(`.${'nav__burger'}`);

    fireEvent.click(burger!);
    expect(screen.getByText('Главное')).toBeInTheDocument();

    fireEvent.click(burger!);
    expect(screen.queryByText('Главное')).not.toBeInTheDocument();
  });
});
