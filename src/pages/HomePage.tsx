import React, { useEffect, useState } from 'react';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { useDebounce } from '../hooks/debounce';
import { RepoCard } from '../components/RepoCard';

export function HomePage() {
    const [search, setSearch] = useState('')
    const [drop, setDrop] = useState(false)
    const debounce = useDebounce(search)
    const { isLoading, isError, data } = useSearchUsersQuery(debounce, {
        skip: debounce.length < 1,
        refetchOnFocus: true
    })

    const [fetcRepos, { isLoading: areReposLoading, data: repos }] = useLazyGetUserReposQuery()

    const clickHendler = (username: string) => {
        fetcRepos(username)
        setDrop(false)
    }
    
    useEffect(() => {
        setDrop(debounce.length > 0 && data?.length! > 0)
    }, [debounce, data])
    return (
        <div className='px-3 flex justify-center pt-10 h-screen w-full'>
            {isError && <p className='text-center text-red-600'>
                Ошибка
            </p> }
            
            <div className='relative w-[560px]'>
                <input type="text"
                    className='border py-2 px-4 w-full h-[42px] mb-2'
                    placeholder='Поиск'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                { drop && <ul className=' absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-auto'>
                    {isLoading && <p className='text-center'>Загрузка...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            onClick={() => clickHendler(user.login)}
                            className='py-2 px-4 hover:bg-gray-500 transition-colors cursor-pointer flex flex-row gap-5 justify-between'>
                            <p className='font-bold'>
                                {user.login}
                            </p>
                        </li>
                    ))}
                </ul>}
                <div className='container '>
                    {areReposLoading && <p className='text-center'>Загрузка репозеториев</p>}
                    {repos?.map(repo => <RepoCard repo={ repo } key={ repo.id } />)}
                </div>
            </div>
        </div>
    )
}
