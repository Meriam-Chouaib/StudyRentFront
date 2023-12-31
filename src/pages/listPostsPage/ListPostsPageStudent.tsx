// React
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
// style
import { BoxCenterFilter, WarningMsg } from './ListPostsPageStudent.style';

// mui
import FilterListIcon from '@material-ui/icons/FilterList';
import { Container, Typography } from '@mui/material';
import { Warning } from '@mui/icons-material';

// features
import { Posts, initialPostsPaginator, GoToMap } from '../../features';

import { BoxCenter, ButtonWithIcon } from '../../components';

// filtre
import { Filter } from './Filtre/Filtre';

// hooks
import usePaginator from '../../hooks/usePaginator';
import { useDebounce } from '../../hooks/useDebounce';
// redux
import {
  useGetMaximalPostPriceQuery,
  useGetMaximalPostSurfaceQuery,
  useGetMinimalPostPriceQuery,
  useGetMinimalPostSurfaceQuery,
  useGetPostsQuery,
} from '../../redux/api/post/post.api';

// utils
import getFilterString from '../../utils/GetFormatFilter';
import { getPersistData } from '../../utils';

import { FilterFields } from './ListPostsPageStudent.type';
import theme from '../../theme';
import { splitAddress } from '../../utils/splitAddress';
import { Link } from 'react-router-dom';
import { PATHS } from '../../config/paths';

interface ListPostsProps {
  displayFilter?: boolean;
  isFavorite?: boolean;
}
export const ListPostsPageStudent = ({ displayFilter }: ListPostsProps) => {
  const { data: dataMaxPrice } = useGetMaximalPostPriceQuery({});
  const { data: dataMinPrice } = useGetMinimalPostPriceQuery({});
  const [isWithAddress, setIsWithAddress] = useState<boolean>(false);

  const { data: dataMaxSurface } = useGetMaximalPostSurfaceQuery({});
  const { data: dataMinSurface } = useGetMinimalPostSurfaceQuery({});
  const maxPrice = dataMaxPrice?.data;
  const minPrice = dataMinPrice?.data;
  const maxSurface = dataMaxSurface?.data;
  const minSurface = dataMinSurface?.data;
  const initialFilterState: FilterFields = {
    price: [minPrice, maxPrice],
    city: '',
    title: '',
    nb_rooms: '',
    surface: [minSurface, maxSurface],
  };
  const user = getPersistData('user', true);
  let universityAddress: string[] = [];

  if (user && user.universityAddress) {
    universityAddress = splitAddress(user.universityAddress);
  }
  const { paginator, onChangePage } = usePaginator({
    ...initialPostsPaginator,
    rowsPerPage: 9,
    ...(user &&
      user.universityAddress &&
      isWithAddress && { universityAddress: universityAddress[0] }),
  });

  const [filter, setFilter] = useState<FilterFields>(initialFilterState);

  // ___________________________ handle change the values of filter ___________________________

  const handleCityChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter({ ...filter, city: event.target.value as string });
  };

  const handleNbRoomsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFilter({ ...filter, nb_rooms: event.target.value as number });
  };

  function handlePriceChange(interval: number[]) {
    setFilter({ ...filter, price: [interval[0] * 15, interval[1] * 15] });
  }

  function handleSurfaceChange(interval: number[]) {
    setFilter({ ...filter, surface: [interval[0] * 2, interval[1] * 2] });
  }

  // ____________________________________ get the right format of the filter ___________________________

  const filterString = useDebounce(getFilterString(filter), 1000);
  function handleResetFilter() {
    setFilter(initialFilterState);
  }

  // ____________________________________ call the query to get my data filtred ___________________________

  const { data, isLoading } = useGetPostsQuery({
    paginator: {
      ...paginator,
      ...(user &&
        user.universityAddress &&
        isWithAddress && { universityAddress: universityAddress[0] }),
    },

    filter: filterString.length !== 0 ? filterString : '',
  });

  const nbPages = data?.nbPages;
  const { t } = useTranslation();
  const handleGetAll = () => {
    setIsWithAddress(!isWithAddress);
    console.log('isWithAddress', isWithAddress);
  };

  const fetchPostsData = async () => {
    try {
      await useGetPostsQuery({
        paginator: {
          ...paginator,
          universityAddress: user.universityAddress && isWithAddress ? universityAddress[0] : '',
        },
        filter: filterString.length !== 0 ? filterString : '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isWithAddress) {
      fetchPostsData();
    }
  }, [isWithAddress, universityAddress, filterString]);

  return (
    <BoxCenter>
      {user && user.role == 'STUDENT' && user.university === null && (
        <Link to={`/${PATHS.DASHBOARD.ROOT}/${PATHS.DASHBOARD.PROFILE}`}>
          <WarningMsg>
            <Warning style={{ color: `${theme.palette.primary.dark}` }} />

            <Typography variant="h6"> {t('listPostsMain.toast_info')}</Typography>
          </WarningMsg>
        </Link>
      )}
      {user && user.role === 'OWNER' && user.phone === null && (
        <>
          <WarningMsg>
            <Warning style={{ color: `${theme.palette.primary.dark}` }} />

            <Typography variant="h6"> {t('listPostsMain.toast_info_owner')}</Typography>
          </WarningMsg>
        </>
      )}
      <Container>
        {/*  ________________ render the posts filtered ______________________ */}
        {user && user.university && (
          <ButtonWithIcon
            sx={{ backgroundColor: theme.palette.secondary.main }}
            icon={<FilterListIcon />}
            txt={isWithAddress ? t('home.show_all') : t('home.show_nearest')}
            onClick={handleGetAll}
          />
        )}
        {displayFilter && (
          <BoxCenterFilter>
            <Filter
              handleCityChange={handleCityChange}
              handleNbRoomsChange={handleNbRoomsChange}
              handlePriceChange={handlePriceChange}
              handleSurfaceChange={handleSurfaceChange}
              filter={filter}
              handleResetFilter={handleResetFilter}
            />
          </BoxCenterFilter>
        )}
        <BoxCenter>
          <Posts
            nbPages={nbPages}
            page={1}
            rowsPerPage={9}
            color={'transparent'}
            padding="0 2.4rem 0 2.4rem"
            margin="0 0 0 0"
            withButton={false}
            withPagination={true}
            dataPosts={data?.posts}
            isLoading={isLoading}
            onChangePage={onChangePage}
          />
        </BoxCenter>
        {data?.posts.length !== 0 && data?.posts !== undefined && <GoToMap />}
      </Container>
    </BoxCenter>
  );
};
