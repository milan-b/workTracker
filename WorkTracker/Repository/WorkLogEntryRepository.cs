﻿using Contracts.Repository;
using Entities.Models;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class WorkLogEntryRepository : RepositoryBase<WorkLogEntry>, IWorkLogEntryRepository
    {
        public WorkLogEntryRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
        }
    }
}
