// ____________________________________________ React ____________________________________________
import usePaginator from '../../../hooks/usePaginator';
import { useGetPostsQuery } from '../../../redux/api/post/post.api';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// ____________________________________________ components ____________________________________________
import { ButtonWithIcon } from '../../../components';
import { initialPostsPaginator } from '../../../features/home/posts/posts.constants';
import { Posts } from '../../../features';

// ____________________________________________ Mui ____________________________________________
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';

// ____________________________________________ config ____________________________________________
import { PATHS } from '../../../config/paths';

// ____________________________________________ Animation ____________________________________________
import { motion } from 'framer-motion';
import { varFade } from '../../../components/animate/fade';
import { useDebounce } from '../../../hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { StackDashboard } from '../../../components/CustomStack/CustomStackStyled.styles';

export const DashboardAdminPosts = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const searchString = useDebounce(search, 800);
  const { paginator, onChangePage } = usePaginator({
    ...initialPostsPaginator,
    isAdminDashboard: true,
    rowsPerPage: 9,
    search: searchString,
  });
  const { data, isLoading } = useGetPostsQuery({ ...paginator, search: searchString });

  const nbPages = data?.nbPages;
  const fadeAnimation = varFade();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const fetchPostsData = async () => {
    try {
      await useGetPostsQuery({
        paginator: { ...paginator, search: searchString },
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (searchString) {
      fetchPostsData();
    }
  }, [searchString]);

  return (
    <>
      <StackDashboard style={{ paddingTop: '1rem' }}>
        <TextField
          type="text"
          name="search"
          label={'search'}
          value={search}
          onChange={handleChange}
          sx={{ width: 'max-content' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </StackDashboard>

      <Posts
        page={2}
        rowsPerPage={9}
        color={'transparent'}
        padding="0"
        margin="2rem 0"
        withButton={false}
        withPagination={true}
        dataPosts={data?.posts}
        isLoading={isLoading}
        onChangePage={onChangePage}
        nbPages={nbPages}
        isDashboard={true}
        isPosts={true}
      />
    </>
  );
};
