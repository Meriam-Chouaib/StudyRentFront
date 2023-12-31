// ____________________________________________ React ____________________________________________
import { useTranslation } from 'react-i18next';
import { useGetUsersQuery } from '../../../redux/api/user/user.api';
import { IUser, initialUsersPaginator } from '../../../redux/api/user/user.types';
import usePaginator from '../../../hooks/usePaginator';
import { Link } from 'react-router-dom';
// ____________________________________________ components ____________________________________________
import { ItemDashboard } from '../../../components/ItemDashboard/ItemDashboard';
import { BoxEditDelete } from '../../../components/CardPost/BoxEditDelete/BoxEditDelete';
import { BoxCenter, ButtonWithIcon } from '../../../components';

// ____________________________________________ mui ____________________________________________
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { InputAdornment, Pagination, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ____________________________________________ images ____________________________________________
import avatar from '../../../assets/images/avatar.png';
import { PATHS } from '../../../config/paths';

// ____________________________________________ animations ____________________________________________
import { motion } from 'framer-motion';
import { varFade } from '../../../components/animate/fade';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks';
import { StackDashboard } from '../../../components/CustomStack/CustomStackStyled.styles';
import { UserItem } from '../../../components/UserItem/UserItem';

export const DashboardAdminStudents = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState('');
  const searchString = useDebounce(search, 800);

  const { paginator, onChangePage } = usePaginator({
    ...initialUsersPaginator,
    rowsPerPage: 6,
    role: 'STUDENT',
    search: searchString,
  });

  const { data } = useGetUsersQuery({ ...paginator, search: searchString });

  let dataToDisplay: IUser[] = [];
  dataToDisplay = data && data.users ? data.users : [];
  const fadeAnimation = varFade();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const fetchUsersData = async () => {
    try {
      await useGetUsersQuery({
        paginator: { ...paginator, search: searchString },
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (searchString) {
      fetchUsersData();
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

        <motion.div initial="initial" animate="animate" exit="exit" variants={fadeAnimation.inLeft}>
          <Link
            to={`/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.ADMIN.ROOT}/${PATHS.DASHBOARD.ADMIN.ADD_STUDENT}`}
            style={{ textDecoration: 'none' }}
          >
            <ButtonWithIcon
              icon={<AddCircleIcon style={{ width: '1.5rem', height: '1.5rem' }} />}
              txt={t('dashboardAdminStudents.add_btn')}
              justify="flex-start"
            />
          </Link>
        </motion.div>
      </StackDashboard>

      <Stack sx={{ padding: '1.3rem 0px' }} spacing={2} direction="column">
        {dataToDisplay.length !== 0 ? (
          dataToDisplay?.map(
            (Item: IUser) =>
              Item.role === 'STUDENT' && (
                <ItemDashboard
                  key={Item.id}
                  img={avatar}
                  txt_1={Item.email}
                  txt_2={Item.username ? Item.username : ''}
                  btns={<UserItem item={Item} />}
                  heightImg={'3rem'}
                  widthImg={'auto'}
                />
              ),
          )
        ) : (
          <></>
        )}
      </Stack>
      {data?.nbUsers !== 0 && data?.users !== undefined && (
        <BoxCenter paddingTop={3}>
          <Pagination
            count={data?.nbPages}
            page={data?.currentPage}
            color="primary"
            onChange={(_e, page) => onChangePage(page)}
          />
        </BoxCenter>
      )}
    </>
  );
};
